import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { queryKeys } from "@/constants/queryKeys";
import { Concert, deleteConcert, getConcertList, updateConcert } from "@/hooks/react-query/useConcert";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Image } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { queryClient } from "@/hooks/react-query/queryClient";
import { useToast } from "@/components/ui/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function Concerts() {
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
  const [openImage, setOpenImage] = useState<boolean | string>(false);
  const [editConcertInput, setEditConcertInput] = useState<Partial<Concert>>({});
  const [query, setQuery] = useState<string>("");
  const params = { query: query };
  const { toast } = useToast();

  const concertList = useQuery({
    queryKey: [queryKeys.concert],
    queryFn: async () => await getConcertList(params),
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

  type PartialRecord<K extends keyof any, T> = {
    [P in K]?: T;
  };

  const concertPropertyName: PartialRecord<keyof Concert, string> = {
    name: "공연이름",
    date: "날짜",
    place: "장소",
    ticket_date: "티켓날짜",
    ticket_place: "티켓장소",
  };
  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: [queryKeys.concert] });
  }, [query]);

  return (
    <div>
      <RadioGroup
        defaultValue="all"
        onValueChange={(value) => {
          console.log(value);
          switch (value) {
            case "all":
              setQuery("");
              break;
            case "unconfirmed":
              setQuery("WHERE confirmed = false");
              break;
            case "confirmed":
              setQuery("WHERE confirmed = true");
              break;
            default:
              break;
          }
        }}
        className="flex"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem className="bg-white" value="all" id="r1" />
          <Label htmlFor="r1">전체보기</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem className="bg-white" value="unconfirmed" id="r2" />
          <Label htmlFor="r2">비확정 콘서트만 보기</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem className="bg-white" value="confirmed" id="r3" />
          <Label htmlFor="r3">확정된 콘서트만 보기</Label>
        </div>
      </RadioGroup>
      <p />
      <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
        <DialogContent className="sm:max-w-[1000px] bg-black">
          <DialogHeader>
            <DialogTitle>Edit</DialogTitle>
          </DialogHeader>
          <div className="flex gap-4">
            <div>
              <img className="w-[500px] h-[500px]" src={editConcertInput.posting_img || ""} alt="" />
            </div>
            <div className="grid gap-4 py-4 w-[500px]">
              {Object.entries(concertPropertyName).map(([key, columnName]) => (
                <div className="grid grid-cols-5 items-center gap-4" key={key}>
                  <Label htmlFor={key} className="text-right">
                    {columnName}
                  </Label>
                  <Input
                    id={key}
                    onChange={(e) => {
                      setEditConcertInput({ ...editConcertInput, [key]: e.target.value });
                    }}
                    value={`${editConcertInput[key as keyof Concert]}`}
                    className="col-span-4 bg-black"
                  />
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
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
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={openImage ? true : false} onOpenChange={setOpenImage}>
        <DialogContent>
          <img src={typeof openImage == "string" ? openImage : ""} alt="" />
        </DialogContent>
      </Dialog>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>idx</TableHead>
              <TableHead>가수</TableHead>
              {Object.values(concertPropertyName).map((columnName) => (
                <TableHead key={columnName}>{columnName}</TableHead>
              ))}
              {/* <TableHead>포스팅URL</TableHead> */}
              <TableHead></TableHead>
              <TableHead>이동</TableHead>
              <TableHead>수정</TableHead>
              <TableHead>확정</TableHead>
              <TableHead>삭제</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {concertList.data?.map((concert) => (
              <TableRow className="whitespace-nowrap" key={concert.idx}>
                <TableCell>{concert.idx}</TableCell>
                <TableCell>{concert.artist_name}</TableCell>
                {Object.keys(concertPropertyName).map((propertyKey) => (
                  <TableCell className="max-w-[200px] overflow-ellipsis overflow-hidden" key={propertyKey}>
                    {concert[propertyKey as keyof Concert]}
                  </TableCell>
                ))}
                <TableCell>
                  <Button
                    variant="ghost"
                    className="p-0 bg-none"
                    size="icon"
                    onClick={() => {
                      setOpenImage(concert.posting_img || false);
                    }}
                  >
                    <Image />
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => {
                      window.open(concert.posting_url);
                    }}
                  >
                    이동
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => {
                      setEditConcertInput(concert);
                      setOpenEditDialog(true);
                    }}
                  >
                    수정
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => {
                      updateConcertMutation.mutate({
                        idx: concert.idx,
                        confirmed: !concert.confirmed,
                      });
                    }}
                  >
                    {!concert.confirmed ? "확정" : "확정해제"}
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => {
                      deleteConcertMutation.mutate(concert.idx);
                    }}
                  >
                    삭제
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
