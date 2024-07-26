import { AnimatedCounter } from "react-animated-counter";
interface CounterProps {
  data: number;
}

function Counter({ data }: CounterProps) {
  return (
    <div className="flex flex-row justify-items-center">
      <AnimatedCounter value={data} color="AEB6BF" fontSize="100px" />
    </div>
  );
}

export default Counter;