"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { THistory, TSummary } from "@/types";
import { ReactNode } from "react";
import moment from "moment";

export function HistoryDialog({
  children,
  summary,
}: {
  children: ReactNode;
  summary: THistory;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Summary Details
          </DialogTitle>
          <DialogDescription>
            Created on:{" "}
            <span className="font-medium text-primary">
              {moment(summary.createdAt).format("MMMM Do YYYY, h:mm A")}
            </span>
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div>
            <Label className="text-sm text-muted-foreground">
              Original Content
            </Label>
            <p className="mt-1 text-sm leading-relaxed text-gray-900 whitespace-pre-wrap bg-gray-100 p-3 rounded-md">
              {summary.content}
            </p>
          </div>

          <div>
            <Label className="text-sm text-muted-foreground">Summary</Label>
            <p className="mt-1 text-sm leading-relaxed text-gray-800 whitespace-pre-wrap bg-gray-50 p-3 rounded-md border">
              {summary.summary}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <div>
              <Label className="text-sm text-muted-foreground">Tags</Label>
              <div className="flex flex-wrap gap-1 mt-1">
                {summary.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="ml-auto text-sm space-y-1 text-gray-600">
              <p>
                Total Words:{" "}
                <span className="font-medium text-gray-800">
                  {summary.totalWord}
                </span>
              </p>
              <p>
                Summary Words:{" "}
                <span className="font-medium text-gray-800">
                  {summary.summaryWord}
                </span>
              </p>
              <p>
                Reduction:{" "}
                <span className="font-medium text-gray-800">
                  {summary.reduction}%
                </span>
              </p>
              <p>
                Time Saved:{" "}
                <span className="font-medium text-gray-800">
                  {summary.savedTime} min
                </span>
              </p>
              <p>
                Type:{" "}
                <span className="capitalize font-medium text-gray-800">
                  {summary.type}
                </span>
              </p>
            </div>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
