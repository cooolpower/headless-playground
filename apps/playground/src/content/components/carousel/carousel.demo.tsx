'use client';

import { useState, useEffect, createContext, useContext } from 'react';
import { Carousel } from '@repo/ui';
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from '@repo/ui';
import * as styles from './carousel.demo.css';
import * as cardStyles from '../card/card.demo.css';

interface CarouselControlsContextType {
  injectStyles: boolean;
  setInjectStyles: (value: boolean) => void;
}

const CarouselControlsContext =
  createContext<CarouselControlsContextType | null>(null);

export function DemoCarouselProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [injectStyles, setInjectStyles] = useState(true);
  return (
    <CarouselControlsContext.Provider value={{ injectStyles, setInjectStyles }}>
      {children}
    </CarouselControlsContext.Provider>
  );
}

export function DemoCarouselControls() {
  const ctx = useContext(CarouselControlsContext);
  if (!ctx) return <div />;

  const { injectStyles, setInjectStyles } = ctx;
  return (
    <label style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <input
        type="checkbox"
        checked={injectStyles}
        onChange={(e) => setInjectStyles(e.target.checked)}
      />
      <span
        style={{
          fontSize: 'var(--font-size-sm)',
          color: 'var(--color-text-secondary)',
        }}
      >
        Inject Styles
      </span>
    </label>
  );
}

function useInjectStyles() {
  return useContext(CarouselControlsContext)?.injectStyles ?? true;
}

const slides = [
  {
    id: 1,
    title: 'Slide 1',
    text: 'First slide content',
    color: 'oklch(62.3% 0.188 259.8)',
  },
  {
    id: 2,
    title: 'Slide 2',
    text: 'Second slide content',
    color: 'oklch(69.6% 0.149 162.5)',
  },
  {
    id: 3,
    title: 'Slide 3',
    text: 'Third slide content',
    color: 'oklch(76.9% 0.165 70.1)',
  },
  {
    id: 4,
    title: 'Slide 4',
    text: 'Fourth slide content',
    color: 'oklch(63.7% 0.208 25.3)',
  },
];

export function DemoCarouselBasic() {
  const injectStyles = useInjectStyles();
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div
      className={`${styles.section} ${!injectStyles ? styles.carouselWrapperClass : ''}`}
    >
      <div className={styles.carouselWrapper}>
        <Carousel
          value={currentIndex}
          onChange={setCurrentIndex}
          injectStyles={injectStyles}
        >
          <div className={styles.carouselContainer}>
            <div
              className={styles.carouselTrack}
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {slides.map((slide) => (
                <div
                  key={slide.id}
                  className={styles.slide}
                  style={{ backgroundColor: slide.color }}
                >
                  <div className={styles.slideTitle}>{slide.title}</div>
                  <div className={styles.slideText}>{slide.text}</div>
                </div>
              ))}
            </div>
            <button
              className={styles.navButton}
              onClick={goToPrevious}
              aria-label="Previous slide"
            >
              ‹
            </button>
            <button
              className={styles.navButton}
              onClick={goToNext}
              aria-label="Next slide"
            >
              ›
            </button>
          </div>
          <div className={styles.indicators}>
            {slides.map((_, index) => (
              <button
                key={index}
                className={`${styles.indicator} ${index === currentIndex ? styles.active : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </Carousel>
      </div>
    </div>
  );
}

export function DemoCarouselAutoplay() {
  const injectStyles = useInjectStyles();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div
      className={`${styles.section} ${!injectStyles ? styles.carouselWrapperClass : ''}`}
    >
      <div className={styles.carouselWrapper}>
        <Carousel
          value={currentIndex}
          onChange={setCurrentIndex}
          injectStyles={injectStyles}
        >
          <div
            className={styles.carouselContainer}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div
              className={styles.carouselTrack}
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {slides.map((slide) => (
                <div
                  key={slide.id}
                  className={styles.slide}
                  style={{ backgroundColor: slide.color }}
                >
                  <div className={styles.slideTitle}>{slide.title}</div>
                  <div className={styles.slideText}>{slide.text}</div>
                </div>
              ))}
            </div>
            <button
              className={styles.navButton}
              onClick={goToPrevious}
              aria-label="Previous slide"
            >
              ‹
            </button>
            <button
              className={styles.navButton}
              onClick={goToNext}
              aria-label="Next slide"
            >
              ›
            </button>
          </div>
          <div className={styles.indicators}>
            {slides.map((_, index) => (
              <button
                key={index}
                className={`${styles.indicator} ${index === currentIndex ? styles.active : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </Carousel>
      </div>
    </div>
  );
}

export function DemoCarouselControlled() {
  const injectStyles = useInjectStyles();
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToSlide = (index: number) => {
    if (index >= 0 && index < slides.length) {
      setCurrentIndex(index);
    }
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div
      className={`${styles.section} ${!injectStyles ? styles.carouselWrapperClass : ''}`}
    >
      <div className={styles.carouselWrapper}>
        <Carousel
          value={currentIndex}
          onChange={setCurrentIndex}
          injectStyles={injectStyles}
        >
          <div className={styles.carouselContainer}>
            <div
              className={styles.carouselTrack}
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {slides.map((slide) => (
                <div
                  key={slide.id}
                  className={styles.slide}
                  style={{ backgroundColor: slide.color }}
                >
                  <div className={styles.slideTitle}>{slide.title}</div>
                  <div className={styles.slideText}>{slide.text}</div>
                </div>
              ))}
            </div>
            <button
              className={styles.navButton}
              onClick={goToPrevious}
              aria-label="Previous slide"
            >
              ‹
            </button>
            <button
              className={styles.navButton}
              onClick={goToNext}
              aria-label="Next slide"
            >
              ›
            </button>
          </div>
          <div className={styles.indicators}>
            {slides.map((_, index) => (
              <button
                key={index}
                className={`${styles.indicator} ${index === currentIndex ? styles.active : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </Carousel>
      </div>
      <div className={styles.controls}>
        <p className={styles.controlDescription}>
          Current slide: {currentIndex + 1} / {slides.length}
        </p>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => goToSlide(0)}
            style={{
              padding: '4px 12px',
              border: '1px solid var(--color-divider)',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            Go to first
          </button>
          <button
            onClick={() => goToSlide(slides.length - 1)}
            style={{
              padding: '4px 12px',
              border: '1px solid var(--color-divider)',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            Go to last
          </button>
        </div>
      </div>
    </div>
  );
}

export function DemoCarouselCustomContent() {
  const injectStyles = useInjectStyles();
  const [currentIndex, setCurrentIndex] = useState(0);

  const customSlides = [
    {
      id: 1,
      content: (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '1rem' }}>🎨</div>
          <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '24px' }}>Design</h3>
          <p style={{ margin: 0, fontSize: '16px', opacity: 0.9 }}>
            Beautiful and modern UI components
          </p>
        </div>
      ),
      color: 'var(--color-semantic-info)',
    },
    {
      id: 2,
      content: (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '1rem' }}>⚡</div>
          <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '24px' }}>
            Performance
          </h3>
          <p style={{ margin: 0, fontSize: '16px', opacity: 0.9 }}>
            Optimized for speed and efficiency
          </p>
        </div>
      ),
      color: 'var(--color-semantic-info)',
    },
    {
      id: 3,
      content: (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '1rem' }}>🔧</div>
          <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '24px' }}>
            Customizable
          </h3>
          <p style={{ margin: 0, fontSize: '16px', opacity: 0.9 }}>
            Easy to customize and extend
          </p>
        </div>
      ),
      color: 'var(--color-semantic-error)',
    },
  ];

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? customSlides.length - 1 : prev - 1,
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) =>
      prev === customSlides.length - 1 ? 0 : prev + 1,
    );
  };

  return (
    <div
      className={`${styles.section} ${!injectStyles ? styles.carouselWrapperClass : ''}`}
    >
      <div className={styles.carouselWrapper}>
        <Carousel
          value={currentIndex}
          onChange={setCurrentIndex}
          injectStyles={injectStyles}
        >
          <div className={styles.carouselContainer}>
            <div
              className={styles.carouselTrack}
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {customSlides.map((slide) => (
                <div
                  key={slide.id}
                  className={styles.slide}
                  style={{ backgroundColor: slide.color }}
                >
                  {slide.content}
                </div>
              ))}
            </div>
            <button
              className={styles.navButton}
              onClick={goToPrevious}
              aria-label="Previous slide"
            >
              ‹
            </button>
            <button
              className={styles.navButton}
              onClick={goToNext}
              aria-label="Next slide"
            >
              ›
            </button>
          </div>
          <div className={styles.indicators}>
            {customSlides.map((_, index) => (
              <button
                key={index}
                className={`${styles.indicator} ${index === currentIndex ? styles.active : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </Carousel>
      </div>
    </div>
  );
}

export function DemoCarouselWithCards() {
  const injectStyles = useInjectStyles();
  const [currentIndex, setCurrentIndex] = useState(0);

  const cardSlides = [
    {
      id: 1,
      title: 'Product A',
      description:
        'This is a description for Product A. It includes important features and benefits.',
      price: '$99',
      color: 'oklch(62.3% 0.188 259.8)',
    },
    {
      id: 2,
      title: 'Product B',
      description:
        'This is a description for Product B. It includes important features and benefits.',
      price: '$149',
      color: 'oklch(69.6% 0.149 162.5)',
    },
    {
      id: 3,
      title: 'Product C',
      description:
        'This is a description for Product C. It includes important features and benefits.',
      price: '$199',
      color: 'oklch(76.9% 0.165 70.1)',
    },
    {
      id: 4,
      title: 'Product D',
      description:
        'This is a description for Product D. It includes important features and benefits.',
      price: '$249',
      color: 'oklch(63.7% 0.208 25.3)',
    },
  ];

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? cardSlides.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === cardSlides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div
      className={`${styles.section} ${!injectStyles ? styles.carouselWrapperClass : ''}`}
    >
      <div className={styles.carouselWrapper}>
        <Carousel
          value={currentIndex}
          onChange={setCurrentIndex}
          injectStyles={injectStyles}
        >
          <div className={styles.carouselContainerCards}>
            <div
              className={styles.carouselTrackCards}
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {cardSlides.map((slide) => (
                <Card
                  key={slide.id}
                  className={cardStyles.cardWrapper}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <div
                    style={{
                      height: '120px',
                      backgroundColor: slide.color,
                      borderRadius: '8px 8px 0 0',
                      margin: '-1rem -1rem 1rem -1rem',
                    }}
                  />
                  <CardHeader>
                    <h4 className={cardStyles.cardTitle}>{slide.title}</h4>
                  </CardHeader>
                  <CardContent>
                    <p className={cardStyles.cardText}>{slide.description}</p>
                  </CardContent>
                  <CardFooter>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                      }}
                    >
                      <span
                        style={{
                          fontSize: 'var(--font-size-xl)',
                          fontWeight: '600',
                        }}
                      >
                        {slide.price}
                      </span>
                      <button className={cardStyles.primaryButton}>
                        구매하기
                      </button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
            <button
              className={styles.navButton}
              onClick={goToPrevious}
              aria-label="Previous slide"
            >
              ‹
            </button>
            <button
              className={styles.navButton}
              onClick={goToNext}
              aria-label="Next slide"
            >
              ›
            </button>
          </div>
          <div className={styles.indicators}>
            {cardSlides.map((_, index) => (
              <button
                key={index}
                className={`${styles.indicator} ${index === currentIndex ? styles.active : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </Carousel>
      </div>
    </div>
  );
}
