export class CreateUserDto {
  id: number;
  name: string;
  passwordHash: string;
  createAt?: Date;
}
