import { AccountModel } from '../../../domain/models/account';
import {
  AddAccount,
  AddAccountModel
} from '../../../domain/usecases/add-account';
import { AddAccountRepository } from '../../protocols/add-account-repository';
import { Encrypter } from '../../protocols/encrypter';

export class DbAddAccount implements AddAccount {
  constructor(
    private readonly encrypter: Encrypter,
    private readonly accountRepository: AddAccountRepository
  ) {}

  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const hashed_password = await this.encrypter.encrypt(accountData.password);
    const account = await this.accountRepository.add(
      Object.assign({}, accountData, { password: hashed_password })
    );
    return account;
  }
}
