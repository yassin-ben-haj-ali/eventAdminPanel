import { forwardRef, useState } from "react"
import { Label } from "./label";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  passwordInput?: boolean;
  className?: string;
  setValue?: (value: string) => void;
  error?:string;
  disabled?: boolean;
  required?: boolean;
  label?:string
}

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ className, type,passwordInput,label, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    
    let inputType;
   
    if(passwordInput) {
      inputType = showPassword ? "text" : "password";
    } else {
      inputType = type;
    }

    return (
     <div className="flex flex-col gap-2">
        {label && (
					<Label className="flex gap-1 text-sm font-medium">
						{label}
						{props.required && <span className="text-red-500">*</span>}
					</Label>
		)}
        <div className="relative">
            <input
                ref={ref}
                type={inputType}
                className={
                    cn("h-10 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 text-sm placeholder:text-gray-500 focus:ring-primary",passwordInput && "pr-10",props.error && "border-red-600 outline-none focus-visible:ring-transparent",props.disabled && "cursor-not-allowed",className)
                }
                {...props}
            />
            {
                passwordInput && (
                    <button
                    type="button"
                    className="absolute top-0  right-0 mr-2 h-full px-3 py-2 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                    >
                    {showPassword ? (
								<EyeIcon className="h-4 w-4" aria-hidden="true" />
							) : (
								<EyeOffIcon className="h-4 w-4" aria-hidden="true" />
							)}
                    </button>
                )
            }
            {props.error && (
              <p className="absolute left-1 block overflow-hidden px-1 text-xs font-normal text-ellipsis whitespace-normal text-red-600">{props.error}</p>
            )}
        </div>
     </div>
    )  
})
export default CustomInput