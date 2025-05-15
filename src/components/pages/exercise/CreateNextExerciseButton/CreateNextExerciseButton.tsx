import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  type State,
  createNextExerciseAction,
} from "@/src/components/pages/exercise/CreateNextExerciseButton/createNextExerciseAction";
import { ChevronRight } from "lucide-react";
import { useActionState } from "react";
export default function CreateNextExerciseButton({
  props,
}: {
  props: {
    year: number;
    month: number;
    day: number;
  };
}) {
  const { year, month, day } = props;
  const initialState: State = { message: null, errors: {} };
  const addExercise_ = createNextExerciseAction.bind(null, year, month, day);
  const [state, formAction] = useActionState(addExercise_, initialState);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="hover:bg-transparent">
          <ChevronRight className="w-5 h-5 text-sky-500" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>エクササイズの作成</DialogTitle>
          <DialogDescription>
            次のエクササイズが存在しません。作成しますか？
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <form action={formAction}>
            <div className="flex items-center gap-4 p-4">
              <div className="w-full">
                <Input
                  type="text"
                  name="name"
                  placeholder="エクササイズ名"
                  defaultValue={""}
                />
                <div id="name-error" aria-live="polite" aria-atomic="true">
                  {state.errors?.name?.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
                </div>
              </div>
              <Button type="submit">作成</Button>
            </div>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
