import {IconDefinition} from "@fortawesome/fontawesome-svg-core";
import React from "react";

export interface ILink {
    id: number
    name: string;
    to: string
    component: React.FC
    icon?: IconDefinition
    nestedRoutes?: ILink[]
}
export interface INavItem{
    name: string;
    to: string
}