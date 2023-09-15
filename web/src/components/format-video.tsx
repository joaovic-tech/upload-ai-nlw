import { useState } from "react";
import { Label } from "./ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "./ui/select";
import { Separator } from "./ui/separator";
import { VideoInputForm } from "./video-input-form";

interface FormatVideoProps {
  setVideoId: (id: string) => void;
}

export function FormatVideo(props: FormatVideoProps) {
  const [format, setFormat] = useState("16-9");

  function handleChangeFormat(value: string) {
    setFormat(value);
  }

  // Define a classe com base na escolha do usuário
  const formatClass = format === "16-9" ? "aspect-video" : "m-auto aspect-9-16 h-96";

  return (
    <>
      <div className="space-y-2">
        <Label>Formato do vídeo</Label>
        <Select defaultValue="16-9" onValueChange={handleChangeFormat}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="9-16">Shorts - 9 / 16</SelectItem>
            <SelectItem value="16-9">Padrão - 16 / 9</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Separator />

      <VideoInputForm onVideoUploaded={props.setVideoId} formatClass={formatClass} />
    </>
  );
}
