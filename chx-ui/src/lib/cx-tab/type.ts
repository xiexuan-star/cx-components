import { NameWithId } from "../../types";

export type CxTabOption = (NameWithId & Partial<{ badgeKey: string; hide: boolean, unit: string }>)