import s from "./companion-mark.module.css";

// Vector interpretation of the supplied mark, using the existing brand palette.
export function CompanionMark() {
  return <svg className={s.mark} viewBox="0 0 84 72" fill="none" aria-hidden="true">
    <g className={s.accents} stroke="#F7941D" strokeWidth="6" strokeLinecap="round"><path d="m20 17-7-10" /><path d="m31 12-1-9" /></g>
    <g className={s.face}>
      <path d="M5 47C5 28 17 23 41 23c24 0 38 5 38 24 0 20-13 22-38 22S5 66 5 47Z" fill="#167D83" />
      <path d="M17 49c0-11 6-14 24-14s25 3 25 14c0 12-6 13-25 13S17 61 17 49Z" fill="white" />
      <g className={s.eyes} stroke="#123A3D" strokeWidth="4.5" strokeLinecap="round"><path d="M25 51c0-8 10-8 10 0" /><path d="M48 51c0-8 10-8 10 0" /></g>
    </g>
  </svg>;
}
