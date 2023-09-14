import { Github, Wand2 } from "lucide-react";
import { ModeToggle } from "./components/mode-toggle";
import { Button } from "./components/ui/button";
import { Separator } from "./components/ui/separator";
import { Textarea } from "./components/ui/textarea";
import { Label } from "./components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select";
import { Slider } from "./components/ui/slider";
import { VideoInputForm } from "./components/video-input-form";
import { PromptSelect } from "./components/prompt-select";
import { useState } from "react";
import { useCompletion } from "ai/react";
import { apiBaseRoute } from "./config/apiBaseRoute";

export function App() {
  const [temperature, setTemperature] = useState(0.5);
  const [videoId, setVideoId] = useState<string | null>(null);

  const {
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    completion,
    isLoading,
  } = useCompletion({
    api: `${apiBaseRoute}/ai/complete`,
    body: {
      videoId,
      temperature,
    },
    headers: {
      "Content-type": "application/json",
    }
  });
  
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div className="flex items-center justify-between px-6 py-3 border-b">
          <h1 className="text-xl font-bold">upload.ai</h1>

          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">
              Desenvolvido com 💜 no NLW da Rocketseat
            </span>
            
            <Separator orientation="vertical" className="h-6"/>
            
            <Button variant="outline">
              <Github className="w-4 h-4 mr-2"/>  
              Github
            </Button>
            <ModeToggle />
          </div>
        </div>
        
        <main className="flex flex-1 gap-6 p-6">
          <div className="flex flex-col flex-1 gap-4">
            <div className="grid flex-1 grid-rows-2 gap-4">
              <Textarea 
                className="p-4 leading-relaxed resize-none"
                placeholder="Inclua o prompt para a IA..."
                value={input}
                onChange={handleInputChange}
              />
              <Textarea 
                className="p-4 leading-relaxed resize-none"
                placeholder="Resultado gerado pela IA..." readOnly
                value={completion}
              />
            </div>

            <p className="text-sm text-muted-foreground">
              Lembre-se: voce pode utilizar a variável <code className="text-violet-400">{'{transcription}'}</code> no seu prompt para adicionar o conteúdo da transcrição do video selecionado
            </p>
          </div>
          <aside className="space-y-6 w-80">
            <VideoInputForm onVideoUploaded={setVideoId} />

            <Separator />

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>Prompt</Label>
                <PromptSelect onPromptSelected={setInput}/>
              </div>

              <div className="space-y-2">
                <Label>Modelo</Label>
                <Select disabled defaultValue="gpt3.5">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gpt3.5">GPT 3.5-turbo</SelectItem>
                  </SelectContent>
                </Select>
                <span className="block text-xs italic text-muted-foreground">
                  Você poderá customizar essa opção em breve
                </span>
              </div>

              <Separator />

              <div className="space-y-4">
                <Label>Temperatura</Label>
                <Slider 
                  min={0}
                  max={1}
                  step={0.1}
                  value={[temperature]}
                  onValueChange={value => setTemperature(value[0])}
                />
                <span className="block text-xs italic leading-relaxed text-muted-foreground">
                  Valores mais altos tendem a deixar o resultado mais criativo e com o possíveis erros.
                </span>
              </div>

              <Separator />

              <Button disabled={isLoading} type="submit" className="w-full">
                Executar
                <Wand2 className="w-4 h-4 ml-2"/>
              </Button>
            </form>
          </aside>
        </main>
      </div>
    </>
  )
}
