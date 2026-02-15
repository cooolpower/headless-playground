import { style, keyframes, createVar } from '@vanilla-extract/css';

export const flipDigitWidthVar = createVar();
export const flipDigitHeightVar = createVar();
export const flipDigitFontSizeVar = createVar();
export const flipDigitTopShiftVar = createVar();
export const flipDigitBottomShiftVar = createVar();

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-base)',
});

export const section = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-base)',
  padding: '2rem',
  width: '100%',
});

export const countdownContainer = style({
  display: 'flex',
  flexDirection: 'row',
  gap: 'var(--spacing-base)',
  //flexWrap: 'wrap',
});

export const content = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-base)',
  alignItems: 'flex-start',
});

export const countdownDisplay = style({
  fontSize: 'var(--font-size-2xl)',
  fontWeight: 'var(--font-weight-semibold)',
  color: 'var(--color-text)',
  fontVariantNumeric: 'tabular-nums',
});

export const countdownCard = style({
  display: 'inline-flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: 'var(--spacing-lg)',
  borderRadius: 'var(--radius-lg)',
  backgroundColor: 'var(--color-surface)',
  border: '1px solid var(--color-border)',
  minWidth: '80px',
});

export const countdownValue = style({
  fontSize: 'var(--font-size-3xl)',
  fontWeight: 'var(--font-weight-bold)',
  color: 'var(--color-text-heading)',
  lineHeight: 1,
});

export const countdownLabel = style({
  fontSize: 'var(--font-size-sm)',
  color: 'var(--color-text-secondary)',
  marginTop: 'var(--spacing-xs)',
});

export const buttonGroup = style({
  display: 'flex',
  gap: 'var(--spacing-sm)',
  marginTop: 'var(--spacing-base)',
});

export const countdownCircularItem = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100px',
  height: '100px',
  paddingTop: '10px',
  lineHeight: '30px',
});

export const countdownSvg = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100px',
  height: '100px',
});

// 플립 애니메이션 keyframes (CodePen 스타일 - Quart.easeOut)
const flipTopFrontAnimation = keyframes({
  '0%': {
    transform: 'rotateX(0deg)',
  },
  '100%': {
    transform: 'rotateX(-90deg)',
  },
});

const flipTopBackAnimation = keyframes({
  '0%': {
    transform: 'rotateX(180deg)',
  },
  '100%': {
    transform: 'rotateX(0deg)',
  },
});

const flipBottomAnimation = keyframes({
  '0%': {
    transform: 'rotateX(90deg)',
  },
  '100%': {
    transform: 'rotateX(0deg)',
  },
});

// 플립 카운트다운 스타일
export const flipCardWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 'var(--spacing-xs)',
});

export const flipCardLabel = style({
  fontSize: 'var(--font-size-sm)',
  color: 'var(--color-text-secondary)',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  fontWeight: 'var(--font-weight-medium)',
  marginBottom: 'var(--spacing-xs)',
});

export const flipCardGroup = style({
  display: 'flex',
  gap: 'var(--spacing-xs)',
  alignItems: 'center',
});

// 단일 자리수 플립 카드 컨테이너 (CodePen 스타일)
export const flipDigitContainer = style({
  vars: {
    [flipDigitWidthVar]: '4.375rem', // 70px
    [flipDigitHeightVar]: '5.625rem', // 90px
    [flipDigitFontSizeVar]: 'var(--font-size-5xl)',
    // 숫자가 한 덩어리처럼 보이도록 em 기반으로 이동 (폰트 크기 따라 자동 스케일)
    [flipDigitTopShiftVar]: '0.45em',
    [flipDigitBottomShiftVar]: '-0.45em',
  },
  perspective: '300px',
  perspectiveOrigin: 'center center',
  width: flipDigitWidthVar,
  height: flipDigitHeightVar,
  position: 'relative',
});

export const flipDigitSizeSm = style({
  vars: {
    [flipDigitWidthVar]: '3.75rem',
    [flipDigitHeightVar]: '5.0rem',
    [flipDigitFontSizeVar]: 'var(--font-size-4xl)',
    // sm에서는 숫자 베이스라인이 달라 하단이 내려가 보일 수 있어
    // 상/하 shift를 약간 더 크게 잡아 "한 숫자"처럼 보이게 보정
    [flipDigitTopShiftVar]: '0.5em',
    [flipDigitBottomShiftVar]: '-0.5em',
  },
});

export const flipDigitSizeMd = style({
  vars: {
    [flipDigitWidthVar]: '4.375rem',
    [flipDigitHeightVar]: '5.625rem',
    [flipDigitFontSizeVar]: 'var(--font-size-5xl)',
  },
});

export const flipDigitSizeLg = style({
  vars: {
    [flipDigitWidthVar]: '5.0rem',
    [flipDigitHeightVar]: '6.25rem',
    [flipDigitFontSizeVar]: 'calc(var(--font-size-5xl) + 0.25rem)',
  },
});

export const flipDigitSizeXl = style({
  vars: {
    [flipDigitWidthVar]: '5.5rem',
    [flipDigitHeightVar]: '6.75rem',
    [flipDigitFontSizeVar]: 'calc(var(--font-size-5xl) + 0.5rem)',
  },
});

// 단일 자리수 플립 카드
export const flipDigit = style({
  position: 'relative',
  width: '100%',
  height: '100%',
  backgroundColor: 'var(--color-surface)',
  border: 'var(--border-width-thin) solid var(--color-border)',
  borderRadius: 'var(--radius-lg)',
  boxShadow: 'var(--shadow-lg)',
  overflow: 'hidden',
});

// 중간 구분선 - CodePen 스타일: 하나의 카드 안에 구분선
export const flipDigitDivider = style({
  position: 'absolute',
  top: '50%',
  left: 0,
  right: 0,
  height: '1px',
  backgroundColor: 'var(--color-border)',
  zIndex: 10,
  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.15)',
  pointerEvents: 'none', // 클릭 이벤트 방지
});

// CodePen 구조: top (정적)
export const flipFigureTop = style({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  height: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'var(--color-surface)',
  overflow: 'hidden',
  zIndex: 1,
  transformOrigin: 'bottom',
  backfaceVisibility: 'hidden',
  boxShadow: 'inset 0 -1px 2px rgba(0, 0, 0, 0.1)',
});

// CodePen 구조: bottom (정적)
export const flipFigureBottom = style({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  height: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'var(--color-surface)',
  overflow: 'hidden',
  zIndex: 1,
  boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.1)',
});

// CodePen 구조: top-back (플립 중 나타남)
export const flipFigureTopBack = style({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  height: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'var(--color-surface)',
  overflow: 'hidden',
  zIndex: 3,
  transformOrigin: 'bottom',
  transform: 'rotateX(180deg)',
  backfaceVisibility: 'hidden',
  transformStyle: 'preserve-3d',
  willChange: 'transform',
});

export const flipFigureTopBackFlipping = style({
  animation: `${flipTopBackAnimation} 0.4s cubic-bezier(0.165, 0.84, 0.44, 1) forwards`,
});

// CodePen 구조: bottom-back (실제론 애니메이션은 없고, 값 교체 시 하단 절반을 자연스럽게 채움)
export const flipFigureBottomBack = style({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  height: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'var(--color-surface)',
  overflow: 'hidden',
  zIndex: 1,
});

// CodePen 구조: top (플립되는 앞면) - 정적 top 위에 덮어서 회전
export const flipFigureTopFlip = style({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  height: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'var(--color-surface)',
  overflow: 'hidden',
  zIndex: 4,
  transformOrigin: 'bottom',
  backfaceVisibility: 'hidden',
  transformStyle: 'preserve-3d',
  willChange: 'transform',
});

export const flipFigureTopFlipFlipping = style({
  animation: `${flipTopFrontAnimation} 0.4s cubic-bezier(0.165, 0.84, 0.44, 1) forwards`,
});

// bottom 플립 오버레이 (두번째 단계)
export const flipFigureBottomFlip = style({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  height: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'var(--color-surface)',
  overflow: 'hidden',
  zIndex: 4,
  transformOrigin: 'top',
  backfaceVisibility: 'hidden',
  transformStyle: 'preserve-3d',
  willChange: 'transform',
  transform: 'rotateX(90deg)',
});

export const flipFigureBottomFlipFlipping = style({
  animation: `${flipBottomAnimation} 0.4s cubic-bezier(0.165, 0.84, 0.44, 1) forwards`,
});

// 플립 애니메이션용 하단 절반
export const flipBottom = style({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  height: '50%',
  transformStyle: 'preserve-3d',
  transformOrigin: 'top',
  zIndex: 3,
  borderBottomLeftRadius: 'var(--radius-lg)',
  borderBottomRightRadius: 'var(--radius-lg)',
  transform: 'rotateX(90deg)',
});

// 플립 애니메이션 활성화 (하단) - 상단 애니메이션이 거의 끝날 때 시작 (CodePen 스타일)
export const flipBottomFlipping = style({
  animation: `${flipBottomAnimation} 0.8s cubic-bezier(0.165, 0.84, 0.44, 1) 0.4s forwards`,
});

// 플립 카드 앞면 (현재 값) - CodePen 스타일: 하나의 카드 안의 상단 절반
export const flipCardFront = style({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'var(--color-surface)',
  backfaceVisibility: 'hidden',
  overflow: 'hidden',
  transform: 'rotateX(0deg)',
  // border-radius 제거 - 전체 카드에만 적용
  // 상단 절반 그림자 효과
  boxShadow: 'inset 0 -1px 2px rgba(0, 0, 0, 0.1)',
});

// 플립 카드 뒷면 (다음 값) - CodePen 스타일: 하나의 카드 안의 상단 절반
export const flipCardBack = style({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'var(--color-surface)',
  backfaceVisibility: 'hidden',
  overflow: 'hidden',
  transform: 'rotateX(180deg)',
  // border-radius 제거 - 전체 카드에만 적용
  // 상단 절반 그림자 효과
  boxShadow: 'inset 0 -1px 2px rgba(0, 0, 0, 0.1)',
});

// 플립 카드 하단 앞면 (다음 값)
export const flipCardBottomFront = style({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'var(--color-surface)',
  backfaceVisibility: 'hidden',
  overflow: 'hidden',
  transform: 'rotateX(0deg)',
  borderBottomLeftRadius: 'var(--radius-lg)',
  borderBottomRightRadius: 'var(--radius-lg)',
  // 하단 절반 그림자 효과
  boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)',
});

// 플립 카드 하단 뒷면 (현재 값)
export const flipCardBottomBack = style({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'var(--color-surface)',
  backfaceVisibility: 'hidden',
  overflow: 'hidden',
  transform: 'rotateX(180deg)',
  borderBottomLeftRadius: 'var(--radius-lg)',
  borderBottomRightRadius: 'var(--radius-lg)',
  // 하단 절반 그림자 효과
  boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)',
});

// 플립 카드 숫자 값
export const flipTopDigitValue = style({
  fontSize: flipDigitFontSizeVar,
  fontWeight: 'var(--font-weight-bold)',
  color: 'var(--color-text-heading)',
  fontVariantNumeric: 'tabular-nums',
  lineHeight: 1,
  textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
  // 상단 절반은 "윗부분"이 보이도록 약간 아래로 내림 (폰트 크기 따라 스케일)
  transform: `translateY(${flipDigitTopShiftVar})`,
});
export const flipBottomDigitValue = style({
  fontSize: flipDigitFontSizeVar,
  fontWeight: 'var(--font-weight-bold)',
  color: 'var(--color-text-heading)',
  fontVariantNumeric: 'tabular-nums',
  lineHeight: 1,
  textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
  // 하단 절반은 "아랫부분"이 보이도록 약간 위로 올림 (폰트 크기 따라 스케일)
  transform: `translateY(${flipDigitBottomShiftVar})`,
});

// ============================================
// DatePicker styles (Countdown Controls 용)
// - date-picker 데모 스타일을 기준으로, 컨트롤러 안에서도 동일하게 보이도록 적용
// ============================================

export const datePickerControl = style({
  // DatePicker 내부 패널(panelWrapper)은 position:absolute로 렌더링되므로
  // 컨테이너가 positioning context를 제공해야 패널이 입력 바로 아래에 뜹니다.
  position: 'relative',
  display: 'inline-block',
  width: '100%',
  maxWidth: '18.75rem', // 300px (date-picker demo와 동일)
});

export const datePickerInputWrapper = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  gap: 'var(--spacing-xs)',
  borderWidth: 'var(--border-width-thin)',
  borderStyle: 'solid',
  borderRadius: 'var(--radius-md)',
  backgroundColor: 'var(--color-surface)',
  borderColor: 'var(--color-divider)',
  transition: 'all 0.2s var(--n-bezier)',
  paddingRight: 'var(--spacing-sm)',
  selectors: {
    '&[data-disabled="true"]': {
      opacity: 0.6,
      cursor: 'not-allowed',
      backgroundColor: 'var(--color-background-disabled)',
      borderColor: 'var(--color-divider)',
    },
  },
});

export const datePickerIconButton = style({
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: 'var(--spacing-xs)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'var(--color-text-secondary)',
  transition: 'all 0.2s var(--n-bezier)',
  borderRadius: 'var(--radius-sm)',
  flexShrink: 0,
  selectors: {
    '&:hover': {
      backgroundColor: 'var(--color-surface-hover)',
      color: 'var(--color-text)',
    },
    '&:disabled': {
      cursor: 'not-allowed',
      opacity: 0.4,
    },
  },
});

export const datePickerPanelWrapper = style({
  position: 'absolute',
  top: 'calc(100% + var(--spacing-xs))',
  left: 0,
  zIndex: 1001,
  backgroundColor: 'var(--color-surface)',
  border: '1px solid var(--color-divider)',
  borderRadius: 'var(--radius-md)',
  boxShadow: 'var(--shadow-lg)',
  minWidth: '18.75rem', // 300px
});

export const datePickerCalendar = style({
  backgroundColor: 'var(--color-surface)',
  border: '1px solid var(--color-divider)',
  borderRadius: 'var(--radius-sm)',
  boxShadow: 'var(--shadow-md)',
  overflow: 'hidden',
  padding: 'var(--spacing-md)',
  minWidth: '18.75rem', // 300px
});

export const datePickerCalendarHeader = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: 'var(--spacing-sm)',
});

export const datePickerNavButton = style({
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: 'var(--spacing-xs) var(--spacing-sm)',
  borderRadius: 'var(--radius-sm)',
  transition: 'all 0.2s var(--n-bezier)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: '1.75rem',
  height: '1.75rem',
  color: 'var(--color-text)',
  selectors: {
    '&:hover': {
      backgroundColor: 'var(--color-surface-hover)',
    },
    '&:active': {
      backgroundColor: 'var(--color-surface-hover)',
    },
  },
});

export const datePickerMonthYear = style({
  fontSize: '0.9375rem',
  fontWeight: 'var(--font-weight-medium)',
  color: 'var(--color-text)',
  userSelect: 'none',
});

export const datePickerWeekHeader = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
  gap: 'var(--spacing-xs)',
  marginBottom: 'var(--spacing-sm)',
});

export const datePickerWeekDay = style({
  textAlign: 'center',
  fontSize: 'var(--font-size-xs)',
  fontWeight: 'var(--font-weight-normal)',
  color: 'var(--color-text-secondary)',
  padding: 'var(--spacing-xs) 0',
  userSelect: 'none',
});

export const datePickerDateGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
});

export const datePickerDateCell = style({
  aspectRatio: '1',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'none',
  background: 'transparent',
  fontSize: 'var(--font-size-sm)',
  color: 'var(--color-text)',
  cursor: 'pointer',
  borderRadius: 'var(--radius-sm)',
  transition: 'all 0.2s var(--n-bezier)',
  padding: 0,
  minHeight: '2rem',
  selectors: {
    '&:active': {
      transform: 'scale(0.95)',
    },
    '&:disabled': {
      color: 'var(--color-text-disabled)',
      cursor: 'not-allowed',
      opacity: 0.4,
    },
    '&:disabled:hover': {
      backgroundColor: 'transparent',
    },
    '&:hover': {
      backgroundColor: 'var(--color-surface-hover)',
    },
  },
});

export const datePickerDateCellToday = style({
  border: '1px solid var(--color-semantic-info)',
  backgroundColor: 'var(--color-semantic-info)',
  color: 'var(--color-text-on-primary)',
  fontWeight: 'var(--font-weight-medium)',
});

export const datePickerDateCellSelected = style({
  backgroundColor: 'var(--color-brand-primary)',
  color: 'var(--color-text-on-primary)',
  fontWeight: 'var(--font-weight-medium)',
  selectors: {
    '&:hover': {
      backgroundColor: 'var(--color-brand-primary-hover)',
      color: 'var(--color-text-on-primary)',
    },
  },
});