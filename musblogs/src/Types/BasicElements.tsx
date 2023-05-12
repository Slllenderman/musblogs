import React from "react";

export type ImageDivProps = {
    class?: string,
    src: string,
    alt: string,
    onClickFunction?: (params: any) => any;
}

export type ButtonProps = {
    class?: string,
    text?: string,
    onClickFunction?: (params: any) => any;
}

export type HrefProps = {
    class?: string,
    text?: string,
    onClickFunction?: (params: any) => any;
}

export type InputProps = {
    class?: string,
    type: string,
    placeholder?: string,
    text?: string,
    onChangeFunction?: (params: any) => any;
}

export type PasswrodProps = {
    class?: string,
    placeholder?: string,
    onChangeFunction?: (params: any) => any;
}

export type CheckboxProps = {
    class?: string,
    value: boolean,
    onClickFunction?: (params: any) => any
}