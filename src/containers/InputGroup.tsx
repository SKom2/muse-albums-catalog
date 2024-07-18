import Input from '@/ui/Input.tsx';
import { FieldValues, UseFormRegister } from 'react-hook-form';

const InputGroup = ({ register }: { register: UseFormRegister<FieldValues> }) => {
  return (
    <div
      className="gap-4 flex flex-col"
    >
      <Input
        name="email"
        type="email"
        placeholder="Enter your email"
        autoComplete="new-email"
        register={register}
      />
      <Input
        name="password"
        type="password"
        placeholder="Enter your password"
        autoComplete="new-password"
        register={register}
      />
    </div>
  );
};

export default InputGroup;