const userModelMock = jest.fn(() => ({
  create: jest.fn((dto) => dto),
  findById: jest.fn((dto) => dto),
  find: jest.fn((dto) => dto),
  findByIdAndDelete: jest.fn((id, dto) => dto),
}));

export default userModelMock;
