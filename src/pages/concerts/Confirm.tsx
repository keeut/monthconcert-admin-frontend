import { useToast } from "@/components/ui/use-toast";
import { queryKeys } from "@/constants/queryKeys";
import { queryClient } from "@/hooks/react-query/queryClient";
import { Concert, deleteConcert, getConcertList, updateConcert } from "@/hooks/react-query/useConcert";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { concertPropertyName } from "./Concerts";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Confirm = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
  const [openImage, setOpenImage] = useState<boolean | string>(false);
  const [editConcertInput, setEditConcertInput] = useState<Partial<Concert>>({});
  const [query, setQuery] = useState<string>("WHERE confirmed=true");
  const params = { query: query };
  const { toast } = useToast();

  const concertList = useQuery({
    queryKey: [queryKeys.concert],
    queryFn: async () => await getConcertList(params),
  });
  const updateConcertMutation = useMutation({
    mutationFn: async (updateItem: Partial<Concert> & { idx: number }) =>
      await updateConcert(updateItem.idx, updateItem),
    onSuccess: () => {
      toast({
        title: "성공 ✅",
        duration: 500,
        // description: "수정",
        // action: <ToastAction altText="">Undo</ToastAction>,
      });
      queryClient.invalidateQueries({ queryKey: [queryKeys.concert] });
    },
    onError: (error) => {
      console.log(error);
      toast({
        variant: "destructive",
        duration: 1000,
        title: "실패 ❌",
      });
    },
  });

  const deleteConcertMutation = useMutation({
    mutationFn: async (idx: number) => await deleteConcert(idx),
    onSuccess: () => {
      toast({
        title: "삭제 성공 ✅",
        duration: 1000,
      });
      queryClient.invalidateQueries({ queryKey: [queryKeys.concert] });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        duration: 1000,
        title: "삭제 실패 ❌",
      });
      console.log(error);
    },
  });

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    if (api.selectedScrollSnap() == 0) {
      setEditConcertInput(concertList.data?.[0] || {});
    }

    api.on("select", () => {
      console.log(api.selectedScrollSnap());
      setCurrent(api.selectedScrollSnap() + 1);
      console.log(concertList.data?.[api.selectedScrollSnap()]);
      setEditConcertInput(concertList.data?.[api.selectedScrollSnap()] || {});
    });
  }, [api, concertList.data]);

  return (
    <div>
      <Carousel setApi={setApi}>
        <CarouselContent>
          {concertList.data?.map((concert) => (
            <CarouselItem key={concert.idx} style={{ width: "90px" }}>
              <div className=" w-fit">
                <div className="flex gap-4">
                  <iframe className="w-[400px] h-[600px]" src={`${editConcertInput.posting_url}embed`}></iframe>
                  <div>
                    <img className="w-[300px] h-[300px]" src={editConcertInput.posting_img || ""} alt="" />
                  </div>
                  <div className="grid gap-4 py-4 w-[300px]">
                    {Object.entries(concertPropertyName).map(([key, columnName]) => (
                      <div className="grid grid-cols-5 items-center gap-4" key={key}>
                        <Label htmlFor={key} className="text-right">
                          {columnName}
                        </Label>
                        <Input
                          id={key}
                          onChange={(e) => {
                            setEditConcertInput({ ...concert, [key]: e.target.value });
                          }}
                          value={`${editConcertInput[key as keyof Concert]}`}
                          className="col-span-4 bg-black"
                        />
                      </div>
                    ))}
                    <Button
                      onClick={() => {
                        editConcertInput.idx
                          ? updateConcertMutation.mutate({
                              idx: editConcertInput.idx,
                              name: editConcertInput.name,
                              date: editConcertInput.date,
                              place: editConcertInput.place,
                              ticket_date: editConcertInput.ticket_date,
                              ticket_place: editConcertInput.ticket_place,
                            })
                          : alert("idx가 없습니다.");
                      }}
                      type="submit"
                    >
                      수정하기
                    </Button>
                    <Button
                    onClick={() => {
                      updateConcertMutation.mutate({
                        idx: editConcertInput.idx!,
                        confirmed: true
                      });
                    }}
                  >
                    확정하기
                  </Button>

                  <Button
                    onClick={() => {
                      deleteConcertMutation.mutate(editConcertInput.idx!);
                    }}
                  >
                    삭제하기
                  </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="py-2 text-center text-sm text-muted-foreground">
        Slide {current} of {count}
      </div>
    </div>
  );
};

export default Confirm;
