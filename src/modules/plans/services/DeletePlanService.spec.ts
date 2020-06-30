import AppError from '@shared/errors/AppError';

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakePlansRepository from '../repositories/fakes/FakePlansRepository';
import DeletePlanService from './DeletePlanService';
import ListPlansService from './ListPlansService';

let fakePlansRepository: FakePlansRepository;
let fakeCacheProvider: FakeCacheProvider;
let deletePlan: DeletePlanService;
let listPlans: ListPlansService;

describe('DeletePlan', () => {
  beforeEach(() => {
    fakePlansRepository = new FakePlansRepository();
    fakeCacheProvider = new FakeCacheProvider();

    deletePlan = new DeletePlanService(fakePlansRepository);
    listPlans = new ListPlansService(fakePlansRepository, fakeCacheProvider);
  });

  it('should be able to delete a plan', async () => {
    const plan = await fakePlansRepository.create({
      title: 'Platinum',
      duration: 6,
      price: 200,
    });

    await deletePlan.execute({ plan_id: plan.id });

    const plans = await listPlans.execute({ page: 1 });

    expect(plans).toEqual([]);
  });

  it('should not be able to delete a non-existing plan', async () => {
    await expect(
      deletePlan.execute({
        plan_id: 'non-existing-plan-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
