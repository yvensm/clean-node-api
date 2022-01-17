import { AccountModel } from '../../../domain/models/account';
import { AddAccountModel } from '../../../domain/usecases/add-account';
import { AddAccountRepository } from '../../protocols/add-account-repository';
import { Encrypter } from '../../protocols/encrypter';
import { DbAddAccount } from './db-add-account';

interface SutTypes {
  sut: DbAddAccount;
  encrypterStub: Encrypter;
  addAccountRepositoryStub: AddAccountRepository;
}

const makeSut = (): SutTypes => {
  const encrypterStub = makeEncrypter();
  const addAccountRepositoryStub = makeAddAccountRepository();
  const sut = new DbAddAccount(encrypterStub, addAccountRepositoryStub);

  return { sut, encrypterStub, addAccountRepositoryStub };
};

const makeAddAccountRepository = () => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    add(account: AddAccountModel): Promise<AccountModel> {
      const fakeAccount: AccountModel = {
        id: 'valid_id',
        name: 'valid_name',
        email: 'valid_email@mail.com',
        password: 'hashed_password'
      };
      return Promise.resolve(fakeAccount);
    }
  }
  return new AddAccountRepositoryStub();
};

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt(value: string): Promise<string> {
      return Promise.resolve('hashed_password');
    }
  }
  return new EncrypterStub();
};

describe('DbAddAccount Usecase', () => {
  test('Should call Encrypter witch correct password', () => {
    const { sut, encrypterStub } = makeSut();
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt');
    const account = {
      email: 'valid_email@mail.com',
      name: 'valid_name',
      password: 'valid_password'
    };
    sut.add(account);
    expect(encryptSpy).toHaveBeenCalledWith('valid_password');
  });

  test('Should throw if encrypter throws', async () => {
    const { sut, encrypterStub } = makeSut();
    jest
      .spyOn(encrypterStub, 'encrypt')
      .mockReturnValueOnce(Promise.reject(new Error()));
    const account = {
      email: 'valid_email@mail.com',
      name: 'valid_name',
      password: 'valid_password'
    };
    const promise = sut.add(account);
    await expect(promise).rejects.toThrow();
  });

  test('Should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut();
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add');
    const account = {
      email: 'valid_email@mail.com',
      name: 'valid_name',
      password: 'hashed_password'
    };
    await sut.add(account);
    expect(addSpy).toHaveBeenLastCalledWith(account);
  });

  test('Should throw if AddAccountRepository throws', async () => {
    const { sut, addAccountRepositoryStub } = makeSut();
    jest
      .spyOn(addAccountRepositoryStub, 'add')
      .mockReturnValueOnce(Promise.reject(new Error()));
    const account = {
      email: 'valid_email@mail.com',
      name: 'valid_name',
      password: 'valid_password'
    };
    const promise = sut.add(account);
    await expect(promise).rejects.toThrow();
  });
});
