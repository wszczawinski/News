import { Calendar } from "lucide-react";

export const FormattedDate = ({ date }: { date: Date }) => {

    const formattedDate = new Date(date).toLocaleDateString("pl-PL", {
        year: "numeric",
        day: "numeric",
        month: "long",
    });

    return (
        <span className="flex gap-2 items-center text-xs">
            <Calendar size={14} /> {formattedDate}
        </span>
    )
}