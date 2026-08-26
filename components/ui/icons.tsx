import type { SVGProps } from "react";

export type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function MenuIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

export function XIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4.5 12.5l5 5 10-11" />
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4.5 12h15M13 5.5l6.5 6.5-6.5 6.5" />
    </svg>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5.5 8.5l6.5 7 6.5-7" />
    </svg>
  );
}

export function HomeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 11.5L12 4l8 7.5" />
      <path d="M6 10v9h12v-9" />
    </svg>
  );
}

export function IdCardIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <circle cx="9" cy="11.2" r="1.8" />
      <path d="M6.3 16c.5-1.4 1.6-2.1 2.7-2.1s2.2.7 2.7 2.1M14.5 10h4M14.5 13.3h4" />
    </svg>
  );
}

export function FlagIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 3.5v17" />
      <path d="M6 4.5c2-1.2 4-1.2 6 0s4 1.2 6 0v8c-2 1.2-4 1.2-6 0s-4-1.2-6 0z" />
    </svg>
  );
}

export function GraduationCapIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M2.5 9.5L12 5l9.5 4.5-9.5 4.5-9.5-4.5z" />
      <path d="M6.5 11.7v4.3c0 1.4 2.5 2.5 5.5 2.5s5.5-1.1 5.5-2.5v-4.3" />
      <path d="M21 9.5v5" />
    </svg>
  );
}

export function ExamIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M7 3.5h8l3 3v13.5a1 1 0 01-1 1H7a1 1 0 01-1-1v-15.5a1 1 0 011-1z" />
      <path d="M9 10.5l1.7 1.7L14.5 8.5" />
      <path d="M9 15.5h6" />
    </svg>
  );
}

export function ChatIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 5.5h16v10.5H9.5L5 20v-4H4z" />
    </svg>
  );
}

export function HeadphonesIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 13.5v-2a8 8 0 0116 0v2" />
      <rect x="3" y="13" width="4" height="6" rx="1.3" />
      <rect x="17" y="13" width="4" height="6" rx="1.3" />
    </svg>
  );
}

export function BookOpenIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 6.5c-1.6-1.3-4-2-7-1.7v13c3-.3 5.4.4 7 1.7 1.6-1.3 4-2 7-1.7v-13c-3-.3-5.4.4-7 1.7z" />
      <path d="M12 6.5v13" />
    </svg>
  );
}

export function PenIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M14.5 5.5l4 4L7 21H3v-4z" />
      <path d="M13 7l4 4" />
    </svg>
  );
}

export function TargetIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="0.6" fill="currentColor" />
    </svg>
  );
}

export function MicrophoneIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M6 11.5a6 6 0 0012 0" />
      <path d="M12 17.5v3.2M9 20.7h6" />
    </svg>
  );
}
