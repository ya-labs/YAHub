using YaHub.Application.Common;
using YaHub.Application.DTOs.User;
using YaHub.Application.Interfaces.User;
using Microsoft.Extensions.Logging;
using YaHub.Application.Interfaces.Security;
using YaHub.Application.Interfaces.Mappers;

namespace YaHub.Application.UseCases.User;

public class UserService : IUserService
{
    private readonly IUserRepository _repository;
    private readonly ILogger<UserService> _logger;
    private readonly IUserMapper _mapper;

    private readonly IPasswordHasherService _passwordHasher;

    public UserService(
        IUserRepository repository,
        ILogger<UserService> logger,
        IUserMapper mapper,
        IPasswordHasherService passwordHasher)
    {
        _repository = repository;
        _logger = logger;
        _mapper = mapper;
        _passwordHasher = passwordHasher;
    }

    public async Task<Result<UserResponse>> CreateAsync(UserRequest userRequest)
    {
        if (userRequest == null)
            return Result<UserResponse>.Fail($"User request cannot be empty.");

        if (await _repository.ExistsByEmailAsync(userRequest.Email))
            return Result<UserResponse>.Fail($"User with email {userRequest.Email} already exists.");

        var hashedPassword = _passwordHasher.Hash(userRequest.Password);

        var user = _mapper.ToEntity(userRequest, hashedPassword);

        await _repository.CreateAsync(user);
        _logger.LogInformation("User successfully created on database.");

        var userResponse = _mapper.ToResponse(user);

        return Result<UserResponse>.Ok(userResponse);
    }

    public async Task<Result<List<UserResponse>>> ReadAllAsync()
    {
        var users = await _repository.ReadAllAsync();
        _logger.LogInformation("Searching users on repository");

        if (users == null)
            return Result<List<UserResponse>>.Fail("Users list not found.");

        var usersResponse = _mapper.ToResponseList(users);
        _logger.LogInformation("");

        if (usersResponse == null)
            return Result<List<UserResponse>>.Fail("Cannot convert users list from response entity");

        return Result<List<UserResponse>>.Ok(usersResponse);
    }

    public async Task<Result<UserResponse>> UpdateAsync(Guid id, UserRequest userRequest)
    {
        var user = await _repository.FindByIdAsync(id);
        _logger.LogInformation($"Searching user by id {id} on database.");

        if (user == null)
            return Result<UserResponse>.Fail($"User with id {id} not found on database.");

        user.Update(userRequest.Username, userRequest.Email);

        await _repository.UpdateAsync(user);
        _logger.LogInformation($"Updating user with id {id} on database.");

        var userResponse = _mapper.ToResponse(user);

        return Result<UserResponse>.Ok(userResponse);
    }

    public async Task<Result<UserResponse>> DeleteAsync(Guid id)
    {
        var user = await _repository.FindByIdAsync(id);
        _logger.LogInformation($"Searching user by id {id} on database.");

        if (user == null)
            return Result<UserResponse>.Fail($"User with id {id} not found on database.");

        await _repository.DeleteAsync(user);
        _logger.LogInformation($"Deleting user with id {id} on database.");

        var userResponse = _mapper.ToResponse(user);

        return Result<UserResponse>.Ok(userResponse);
    }
}
