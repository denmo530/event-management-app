"use client";
import React from "react";
// import {
//   Avatar as AvatarComponent,
//   AvatarFallback,
//   AvatarImage,
// } from "@web/components/ui/avatar";

import { useUser } from "@clerk/clerk-react";
import Link from "next/link";

export const Avatar = ({ href }: { href: string }) => {
  const user = useUser();
  const isLoading = user.isLoaded === false;

  let initials: string | undefined = undefined;
  if (user.user?.firstName && user.user?.lastName) {
    initials = user.user.firstName[0] + user.user.lastName[0];
  }

  return (
    <>
      {!isLoading && (
        <Link href={href}>
          <div className="flex gap-2 items-center">
            {/* <AvatarComponent className="w-6 h-6">
              <AvatarImage src={user.user?.imageUrl} />
              <AvatarFallback className="text-sm">{initials}</AvatarFallback>
            </AvatarComponent> */}
            <span className="text-muted-foreground text-base font-medium">
              Dennis Moradkhani
            </span>
          </div>
        </Link>
      )}
    </>
  );
};
