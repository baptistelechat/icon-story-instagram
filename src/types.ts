export type IconMode = "lucide" | "emoji";

export interface IconState {
  mode: IconMode;
  backgroundColor: string;
  iconName: string;
  iconColor: string;
  iconSize: number;
  emoji: string;
  borderRadius: number;
}
