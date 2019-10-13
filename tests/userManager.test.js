const manager = require('../userManager');
const bcrypt = require('bcrypt');

describe('Test userManager', () => {

    const id = 'XXXXXXXX-test-0000-1111-XXXXXXXXXXXX';
    const password = 'secretPassword';
    const loginName = 'testuser';

    it('should register a new user', async () => {
        const user = await manager.registerUser({
            id: id,
            loginName: loginName,
            email: 'test@user.de',
            password: password
        });

        expect(user.createdAt).not.toBeNull();
        expect(user.updatedAt).not.toBeNull();
    });

    it('should find registered user', async () => {

        expect(id).not.toBeNull();
        const result = await manager.getUser(id);

        user = result.Item;
        expect(user).not.toBeNull();
        expect(user.password).not.toBeNull();

        const match = await bcrypt.compare(password, user.password);
        expect(match).toBeTruthy();

        expect(user.createdAt).not.toBeNull();
        expect(user.updatedAt).not.toBeNull();

    });

    it('should find user by loginName', async () => {

        const result = await manager.getUserByLoginName(loginName);
        const user = result.Items[0];

        expect(user.id).toBe(id);
        expect(user.createdAt).not.toBeNull();
        expect(user.updatedAt).not.toBeNull();

    });

    it('should delete registered user', async () => {

        let user = await manager.deleteUser(id);
 
    });

})