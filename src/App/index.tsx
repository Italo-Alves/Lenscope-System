import { FormEvent, useState } from "react"

type lensTypes = 'Prime' | 'Vision';

export const App = () => {
  const [grauEsfericoEsquerdo, setGrauEsfericoEsquerdo] = useState(NaN);
  const [grauEsfericoDireito, setGrauEsfericoDireito] = useState(NaN);
  const [grauCilindricoEsquerdo, setGrauCilindricoEsquerdo] = useState(NaN);
  const [grauCilindricoDireito, setGrauCilindricoDireito] = useState(NaN);

  const [lensType, setLensType] = useState<lensTypes | null>(null);

  function handleSubmitForm(event: FormEvent) {
    event.preventDefault();

    if ((grauEsfericoEsquerdo > 12 || grauEsfericoDireito > 12) || (grauEsfericoEsquerdo < 3 || grauEsfericoDireito < 3)) {
      setLensType('Vision');
    } else if (isNaN(grauCilindricoEsquerdo) && isNaN(grauCilindricoDireito)) {
      if (isNaN(grauEsfericoEsquerdo) && isNaN(grauEsfericoDireito)) {
        setLensType(null);
        return;
      }
      setLensType('Prime');
    } else if (grauCilindricoEsquerdo > 2 || grauCilindricoDireito > 2) {
      setLensType('Vision');
    } else if (grauEsfericoEsquerdo <= 10 && grauEsfericoDireito <= 10) {
      setLensType('Prime');
    } else {
      setLensType('Vision');
    }
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <header>
        <span className="text-xl leading-6">Sistema de Lentes</span>
      </header>
      <form onSubmit={handleSubmitForm} className="flex flex-col mt-4 max-w-xs w-full gap-1.5">
        <input
          type="number"
          placeholder="Grau esférico do olho esquerdo"
          className="text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none"
          onChange={(event) => setGrauEsfericoEsquerdo(Math.abs(event.target.valueAsNumber))}
          min="-15"
          max="0"
          step="0.25"
          required={isNaN(grauEsfericoDireito) ? true : false}
        />


        <input
          type="number"
          placeholder="Grau esférico do olho direto"
          className="text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none"
          onChange={(event) => setGrauEsfericoDireito(Math.abs(event.target.valueAsNumber))}
          min="-15"
          max="0"
          step="0.25"
          required={isNaN(grauEsfericoEsquerdo) ? true : false}
        />


        <input
          type="number"
          placeholder="Grau cilíndrico do olho esquerdo"
          className="text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none"
          onChange={(event) => setGrauCilindricoEsquerdo(Math.abs(event.target.valueAsNumber))}
          min="-6"
          max="0"
          step="0.25"
        />


        <input
          type="number"
          placeholder="Grau cilíndrico do olho direito"
          className="text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none"
          onChange={(event) => setGrauCilindricoDireito(Math.abs(event.target.valueAsNumber))}
          min="-6"
          max="0"
          step="0.25"
        />

        <button
          type="submit"
          className="p-2 mt-1 bg-brand-500 rounded-md border-transparent flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
        >
          Enviar
        </button>

        {lensType !== null && (
          <span className="flex justify-center mt-2">Lente apropriada: <strong className="ml-1">{lensType}</strong></span>
        )}
      </form>
    </div>
  )
}
