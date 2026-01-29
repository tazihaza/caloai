// src/domain/activity/activity.ts
import { Activity } from "./model"
import { addActivity } from "@/data/storage/activityLog"

export function createActivity(input: Activity) {
  addActivity(input)
}
