import AppError from '@shared/errors/AppError';

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakePlansRepository from '../repositories/fakes/FakePlansRepository';
import CreatePlanService from './CreatePlanService';

let fakePlansRepository: FakePlansRepository;
let fakeCacheProvider: FakeCacheProvider;
let createPlan: CreatePlanService;

describe('CreatePlan', () => {
  beforeEach(() => {
    fakePlansRepository = new FakePlansRepository();
    fakeCacheProvider = new FakeCacheProvider();

    createPlan = new CreatePlanService(fakePlansRepository, fakeCacheProvider);
  });

  it('should be able to create a new plan', async () => {
    const plan = await createPlan.execute({
      title: 'Platinum',
      duration: 6,
      price: 200,
    });

    expect(plan).toHaveProperty('id');
  });

  it('should not be able to create a new plan with same e-mail from another', async () => {
    await createPlan.execute({
      title: 'Platinum',
      duration: 6,
      price: 200,
    });

    await expect(
      createPlan.execute({
        title: 'Platinum',
        duration: 6,
        price: 200,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
