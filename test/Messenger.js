const { expect } = require('chai');

describe('Messenger', function () {
  let messenger;
  let owner;

  beforeEach(async function () {
    const Messenger = await ethers.getContractFactory('Messenger');
    [owner] = await ethers.getSigners();
    messenger = await Messenger.deploy();
    await messenger.deployed();
  });

  it('should add a message', async function () {
    const content = 'her güzel şeyin bir sonu vardır...';
    await messenger.addMessage(content);

    const user = await messenger.users(0);
    expect(user.messageID).to.equal(0);
    expect(user.Address).to.equal(owner.address);
    expect(user.Message).to.equal(content);
  });

  it('should list all messages', async function () {
    const content1 = 'Merhaba patikda.dev';
    const content2 = 'Merhaba bnb chain';

    await messenger.addMessage(content1);
    await messenger.addMessage(content2);

    const users = await messenger.listMessage();

    expect(users.length).to.equal(2);

    expect(users[0].messageID).to.equal(0);
    expect(users[0].Address).to.equal(owner.address);
    expect(users[0].Message).to.equal(content1);

    expect(users[1].messageID).to.equal(1);
    expect(users[1].Address).to.equal(owner.address);
    expect(users[1].Message).to.equal(content2);
  });
});
