import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CarouselWithThumbs } from "./CarouselThumbs";

export const GalleryDialog = ({
  images,
  title,
}: {
  images: string[];
  title: string;
}) => {
  return (
    <Dialog>
      <DialogTrigger>Gallery</DialogTrigger>
      <DialogContent className="md:max-w-3xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <CarouselWithThumbs images={images} />
      </DialogContent>
    </Dialog>
  );
};
