import type { DetailedHTMLProps, InputHTMLAttributes } from "react";
import { cn } from "../../utils/cn";

interface SliderProps extends Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'type'> {
    label: string;
    value: number;
    min: number;
    max: number;
    unit: string;
    color?: "blue" | "emerald" | "rose" | "amber" | "purple";
}

const bgMap = {
    blue: "bg-blue-500",
    emerald: "bg-emerald-500",
    rose: "bg-rose-500",
    amber: "bg-amber-500",
    purple: "bg-purple-500",
};

export const Slider = ({ label, value, min, max, unit, color = "emerald", className, ...props }: SliderProps) => {
    const percentage = ((value - min) / (max - min)) * 100;

    return (
        <div className={cn("flex flex-col gap-2 w-full", className)}>
            <div className="flex justify-between items-center text-sm font-bold text-slate-700">
                <span>{label}</span>
                <span className={cn("px-2 py-1 rounded-md text-white shadow-sm text-xs", bgMap[color])}>
                    {value} {unit}
                </span>
            </div>

            <div className="relative w-full h-2 rounded-full bg-slate-200">
                <div
                    className={cn("absolute top-0 left-0 h-full rounded-full transition-all duration-300", bgMap[color])}
                    style={{ width: `${percentage}%` }}
                />
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={value}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    {...props}
                />
                {/* Custom thumb */}
                <div
                    className={cn(
                        "absolute top-1/2 -mt-2.5 -ml-2.5 w-5 h-5 rounded-full shadow-md border-2 border-white pointer-events-none transition-transform duration-200",
                        bgMap[color]
                    )}
                    style={{ left: `calc(${percentage}%)`, transform: "translate(-50%, 0)" }}
                />
            </div>
            <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                <span>{min}</span>
                <span>{max}</span>
            </div>
        </div>
    );
};
