<!-- Observações: -->

interface CyclesContextType {
activeCycle: Cycle | undefined
activeCycleId: string | null
amountSecondsPassed: number
markCurrentCycleAsFinished: () => void
setSecondsPassed: (seconds: number) => void
}

const newCycleFormValidationSchema = zod.object({
task: zod.string().min(1, 'Informe a tarefa'),
minutesAmount: zod.number().min(5).max(60),
})

// A biblioteca ZOD extrai a tipagem do Schema de validação: (schema de validação acima e a tipagem está abaixo)

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export const CyclesContext = createContext({} as CyclesContextType)

export function Home() {
// Estado para armazenar o ciclo em si:
const [cycles, setCycles] = useState<Cycle[]>([])
const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
// Exemplo de Uncontrolled para o INPUT do usuário.
// O register retorna alguns métodos que servem para trabalhar com os inputs do JS => como onChange...

const newCycleForm = useForm<NewCycleFormData>({
resolver: zodResolver(newCycleFormValidationSchema),
defaultValues: {
task: '',
minutesAmount: 0,
},
})

const { handleSubmit, watch, reset } = newCycleForm

const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

function setSecondsPassed(seconds: number) {
setAmountSecondsPassed(seconds)
}

function markCurrentCycleAsFinished() {
setCycles((state) =>
state.map((cycle) => {
if (cycle.id === activeCycleId) {
return { ...cycle, finishedDate: new Date() }
} else {
return cycle
}
}),
)
}

function handleCreateNewCycle(data: NewCycleFormData) {
const id = String(new Date().getTime())
const newCycle: Cycle = {
id,
task: data.task,
minutesAmount: data.minutesAmount,
startDate: new Date(),
}
// Sempre que a mudança de estado depender de um estado anterior, usamos uma arrow function.
setCycles((state) => [...cycles, newCycle])

    setActiveCycleId(id)
    setAmountSecondsPassed(0)
    reset()

}
