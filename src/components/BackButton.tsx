import { Undo2 } from "lucide-react"
import { Button } from "./ui/button"
import { useCanGoBack, useRouter } from "@tanstack/react-router";


export const BackButton = () => {
    const router = useRouter();
    const canGoBack = useCanGoBack()

    const handleGoBack = () => {
        if (canGoBack) {
            router.history.back();
        } else {
            router.navigate({ to: '/' });
        }
    };

    return (
        <Button onClick={handleGoBack} size={"sm"} variant={"outline"} className="cursor-pointer">
            <Undo2 />
        </Button>
    )
}