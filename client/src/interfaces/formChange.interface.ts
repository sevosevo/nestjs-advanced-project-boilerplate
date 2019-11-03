import { ChangeEvent, FormEvent } from "react";

export interface FormChange {
    handleFormChange: (ev: ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (ev: FormEvent<any>) => void;
}