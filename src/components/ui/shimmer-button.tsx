import React, { FC, ButtonHTMLAttributes, ReactNode } from "react";

interface ShimmerButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}
const ShimmerButton: FC<ShimmerButtonProps> = ({ children }) => {
  return (
    <button className="inline-flex h-9 p-4 rounded-md animate-shimmer items-center justify-center border border-slate-600 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-gray-100 transition-colors focus:bg-stone-900  focus:outline-none focus:ring-1 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 active:animate-ping">
      {children}
    </button>
  );
};

export default ShimmerButton;
