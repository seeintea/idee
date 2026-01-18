"use client";
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { type ComponentProps, type PropsWithChildren, useCallback, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

interface EmblaCarouselProps {
  className?: string;
  render: React.ReactNode[];
}

type EmblaCarouselType = NonNullable<UseEmblaCarouselType[1]>;

export function EmblaCarousel({ className, render }: EmblaCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel();

  const [canScrollPrev, setCanScrollPrev] = useState<boolean>(false);
  const [canScrollNext, setCanScrollNext] = useState<boolean>(true);

  const handleScrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const handleScrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <>
      <div className={twMerge("overflow-hidden", className)} ref={emblaRef}>
        <div className="flex">
          {render.map((item, idx) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: simple list
            <div className="min-w-0 shrink-0 grow-0 flex-basis-full" key={idx}>
              {item}
            </div>
          ))}
        </div>
      </div>
      <div className={"mt-3 mr-1 flex items-center justify-end gap-2"}>
        <EmblaCarouselButton onClick={handleScrollPrev} disabled={!canScrollPrev}>
          <ArrowLeft size={18} />
        </EmblaCarouselButton>
        <EmblaCarouselButton onClick={handleScrollNext} disabled={!canScrollNext}>
          <ArrowRight size={18} />
        </EmblaCarouselButton>
      </div>
    </>
  );
}

function EmblaCarouselButton(props: PropsWithChildren & ComponentProps<"button">) {
  const { className, children, disabled = false, ...rest } = props;

  return (
    <button
      type="button"
      className={twMerge(
        "w-6 h-6 flex items-center justify-center border rounded cursor-pointer",
        disabled ? "opacity-50 cursor-not-allowed!" : "",
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
