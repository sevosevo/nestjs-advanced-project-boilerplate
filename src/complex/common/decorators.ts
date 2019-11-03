import { Inject } from "@nestjs/common";
import { getConnectionName } from "./utils";

export const InjectConnection = (name: string) => Inject(getConnectionName(name));