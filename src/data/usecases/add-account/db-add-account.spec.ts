import { AccountModel } from '../../../domain/models/account';
import { Encrypter } from '../../protocols/encrypter';
import { DbAddAccount } from './db-add-account';

interface SutTypes {
  sut: DbAddAccount;
  encrypterStub: Encrypter;
}

const makeSut = (): SutTypes => {
  const encrypterStub = makeEncrypter();
  const sut = new DbAddAccount(encrypterStub);

  return { sut, encrypterStub };
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
});
