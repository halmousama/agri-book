import type { ReactNode } from "react";
import { AlertTriangle, CheckCircle, Info, XCircle } from "lucide-react";
import { cn } from "../../utils/cn";

interface AlertProps {
    type: "success" | "danger" | "warning" | "info";
    title?: string;
    children: ReactNode;
}

const icons = {
    success: <CheckCircle className="shrink-0 text-emerald-600 drop-shadow-[0_0_8px_rgba(5,150,105,0.4)]" />,
    danger: <XCircle className="shrink-0 text-rose-600 drop-shadow-[0_0_8px_rgba(225,29,72,0.4)] animate-pulse" />,
    warning: <AlertTriangle className="shrink-0 text-amber-600 drop-shadow-[0_0_8px_rgba(217,119,6,0.4)]" />,
    info: <Info className="shrink-0 text-blue-600 drop-shadow-[0_0_8px_rgba(37,99,235,0.4)]" />,
};

const styles = {
    success: "bg-emerald-500/10 border-emerald-500/30 text-emerald-800 dark:text-emerald-300 shadow-[0_0_15px_rgba(5,150,105,0.1)]",
    danger: "bg-rose-500/10 border-rose-500/30 text-rose-800 dark:text-rose-300 shadow-[0_0_15px_rgba(225,29,72,0.1)]",
    warning: "bg-amber-500/10 border-amber-500/30 text-amber-900 dark:text-amber-300 shadow-[0_0_15px_rgba(217,119,6,0.1)]",
    info: "bg-blue-500/10 border-blue-500/30 text-blue-900 dark:text-blue-300 shadow-[0_0_15px_rgba(37,99,235,0.1)]",
};

export const Alert = ({ type, title, children }: AlertProps) => {
    return (
        <div className={cn(
            "flex items-start gap-4 p-5 rounded-2xl border backdrop-blur-md transition-all duration-300 transform",
            styles[type]
        )}>
            <div className="mt-0.5">{icons[type]}</div>
            <div className="flex-1">
                {title && <h4 className="font-bold mb-1 text-lg">{title}</h4>}
                <div className="text-sm leading-relaxed font-medium opacity-90">{children}</div>
            </div>
        </div>
    );
};
