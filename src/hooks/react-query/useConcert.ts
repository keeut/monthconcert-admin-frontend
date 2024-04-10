import { publicAxiosInstance } from "@/axios/publicAxios";

export const getConcertList = async (params: { query: string }): Promise<Concert[]> => {
  const res = await publicAxiosInstance.get("/concert", {
    params,
  });
  return res.data.monthConcertArray;
};

export const updateConcert = async (idx: number, updateItem: Partial<Omit<Concert, "idx">>) => {
  const res = await publicAxiosInstance.put("/concert", { idx, ...updateItem });

  return res.data;
};

export const deleteConcert = async (idx: number) => {
  const res = await publicAxiosInstance.delete("/concert", { params: { idx } });

  return res.data;
};

export type Concert = {
  name?: string;
  date?: string;
  place?: string;
  ticket_date?: string;
  ticket_place?: string;
  artist_name?: string;
  instagram_account?: string;
  posting_url?: string;
  posting_img?: string;
  confirmed: boolean;
  idx: number;
};
