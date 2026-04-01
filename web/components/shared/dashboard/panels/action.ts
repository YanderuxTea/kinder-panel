"use server";
import { cookies } from "next/headers";
import { Query } from "@/components/shared/dashboard/panels/AdminPanel";

export async function getDataForSettings() {
  const cookieStorage = await cookies();
  const token = cookieStorage.get("token-kinder-panel")?.value;
  const req = await fetch(`${process.env.BACKEND_URL}/settings/get-data`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token: token }),
  });
  return await req.json();
}
export type DataSettingsType = {
  fullname: string;
  email: string;
  tel: string;
  address: string;
};
export async function changeDataForSettings({
  data,
}: {
  data: DataSettingsType;
}) {
  const cookieStorage = await cookies();
  const token = cookieStorage.get("token-kinder-panel")?.value;
  const req = await fetch(`${process.env.BACKEND_URL}/settings/change-data`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fullname: data.fullname,
      email: data.email,
      tel: data.tel,
      address: data.address,
      token: token,
    }),
  });
  return await req.json();
}
export type Kindergartens = {
  id: string;
  owner: { fullname: string; login: string };
  name: string;
  address: string;
  endSubscription: Date;
};
export async function fetchKindergartens() {
  const cookieStorage = await cookies();
  const token = cookieStorage.get("token-kinder-panel")?.value;
  const req = await fetch(
    `${process.env.BACKEND_URL}/admin-panel/fetch-kindergartens`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: token }),
    },
  );
  const res: {
    data: { kindergartens: Kindergartens[]; cursor: string; hasMore: boolean };
  } = await req.json();
  return res;
}
export async function fetchMoreKindergartens(cursor: string, query: Query) {
  const cookieStorage = await cookies();
  const token = cookieStorage.get("token-kinder-panel")?.value;
  const req = await fetch(
    `${process.env.BACKEND_URL}/admin-panel/fetch-more-kindergartens`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cursor: cursor,
        token: token,
        userLogin: query.userLogin.trim(),
        nameKindergarten: query.nameKindergarten.trim(),
      }),
    },
  );
  const res: {
    data: { kindergartens: Kindergartens[]; cursor: string; hasMore: boolean };
  } = await req.json();
  return res;
}
export async function searchKindergartens(query: Query) {
  const cookieStorage = await cookies();
  const token = cookieStorage.get("token-kinder-panel")?.value;
  const req = await fetch(
    `${process.env.BACKEND_URL}/admin-panel/search-kindergartens`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: token,
        nameKindergartens: query.nameKindergarten.trim(),
        userLogin: query.userLogin.trim(),
      }),
    },
  );
  const res: {
    data: { kindergartens: Kindergartens[]; cursor: string; hasMore: boolean };
  } = await req.json();
  return res;
}
export type Nutrition = {
  id: string;
  dayWeek: number;
  breakfast: string;
  secondBreakfast: string;
  lunch: string;
  afternoonSnack: string;
  breakfastTime: string;
  secondBreakfastTime: string;
  lunchTime: string;
  afternoonSnackTime: string;
};
export async function getNutritionFunc(id: string) {
  const cookieStorage = await cookies();
  const token = cookieStorage.get("token-kinder-panel")?.value;
  const req = await fetch(
    `${process.env.BACKEND_URL}/nutrition/get-nutrition`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: token, id: id }),
    },
  );
  const res: { data: Nutrition[] | null } = await req.json();
  return res;
}
export async function changeNutritionFunc(
  id: string,
  data: Omit<Nutrition, "id" | "dayWeek">,
  dayWeek: number,
) {
  const checkArr = [
    data.afternoonSnackTime,
    data.breakfastTime,
    data.secondBreakfastTime,
    data.lunchTime,
  ];
  const regex = new RegExp(`^\\d{2}:\\d{2}-\\d{2}:\\d{2}$`);
  for (const value of checkArr) {
    if (!regex.test(value)) {
      return { ok: false };
    }
  }
  if (dayWeek < 1 || dayWeek > 5) {
    return { ok: false };
  }
  const cookieStorage = await cookies();
  const token = cookieStorage.get("token-kinder-panel")?.value;
  const req = await fetch(
    `${process.env.BACKEND_URL}/nutrition/change-nutrition`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
        id: id,
        dayWeek: dayWeek,
        data: data,
      }),
    },
  );
  const res: { ok: boolean } = await req.json();
  return res;
}
export type Groups = {
  id: string;
  name: string;
  _count: {
    childrens: number;
  };
  childrens: {
    id: string;
    name: string;
    group: {
      name: string;
    };
    surname: string;
    dateOfBirth: Date;
    parents: {
      fullname: string;
    }[];
  }[];
};
export async function getGroups(id: string) {
  const cookieStorage = await cookies();
  const token = cookieStorage.get("token-kinder-panel")?.value;
  const req = await fetch(`${process.env.BACKEND_URL}/groups/get-groups`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: token, id: id }),
  });
  const res: { groups: Groups[] } = await req.json();
  return res;
}
export async function createGroup(idKindergarten: string, nameGroup: string) {
  const cookieStorage = await cookies();
  const token = cookieStorage.get("token-kinder-panel")?.value;
  if (nameGroup.trim().length === 0) {
    return { ok: false, message: "Введите название группы" };
  }
  const req = await fetch(`${process.env.BACKEND_URL}/groups/create-group`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      token,
      kindergartenId: idKindergarten,
      name: nameGroup.trim(),
    }),
  });
  const res: { ok: true; group: Groups } | { ok: false; message: string } =
    await req.json();
  return res;
}
export async function createChild(data: {
  name: string;
  surname: string;
  birthdate: Date;
  loginsParents: string[];
  idSelectGroup: string;
}) {
  const cookieStorage = await cookies();
  const token = cookieStorage.get("token-kinder-panel")?.value;
  const req = await fetch(`${process.env.BACKEND_URL}/groups/create-child`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token: token, ...data }),
  });
  const res:
    | { ok: false; message: string }
    | {
        ok: true;
        data: {
          id: string;
          name: string;
          group: {
            name: string;
          };
          surname: string;
          dateOfBirth: Date;
          parents: {
            fullname: string;
          }[];
        };
      } = await req.json();
  console.log(res);
  return res;
}
