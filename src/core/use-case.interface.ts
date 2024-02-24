export interface UseCase<Input = void, Output = Promise<void>> {
  execute: (input: Input) => Output;
}
