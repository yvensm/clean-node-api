import { AccountModel } from '../../../domain/models/account';
import { Encrypter } from '../../protocols/encrypter';
import { DbAddAccount } from './db-add-account';

describe('DbAddAccount Usecase', () => {
  test('Should call Encrypter witch correct password', () => {
    class EncrypterStub implements Encrypter {
      async encrypt(value: string): Promise<string> {
        return Promise.resolve('hashed_password');
      }
    }
    const encrypterStub = new EncrypterStub();
    const sut = new DbAddAccount(encrypterStub);
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
