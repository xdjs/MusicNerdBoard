import { inspector } from "@vercel/board/inspect";
import { team } from "@/lib/board";
import { withMember } from "@/lib/inspect/withMember";

const inspect = withMember(inspector({ board: team, basePath: "/board" }), "/board");

export const GET = inspect;
export const POST = inspect;
export const PATCH = inspect;
export const PUT = inspect;
export const DELETE = inspect;
