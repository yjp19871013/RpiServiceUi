export class ValidateCodeResquest {
    public email: string;
}

export class RegisterRequest {
	public email: string;
	public password1: string;
	public password2: string;
	public validateCode: string;
}
