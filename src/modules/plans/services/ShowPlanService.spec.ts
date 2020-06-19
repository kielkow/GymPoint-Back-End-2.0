import AppError from '@shared/errors/AppError';

import FakePlansRepository from '../repositories/fakes/FakePlansRepository';
import ShowPlanService from './ShowPlanService';

let fakePlansRepository: FakePlansRepository;
let showPlan: ShowPlanService;

describe('ShowPlan', () => {
  beforeEach(() => {
    fakePlansRepository = new FakePlansRepository();

    showPlan = new ShowPlanService(fakePlansRepository);
  });

  it('should be able to show the plan', async () => {
    const plan = await fakePlansRepository.create({
      title: 'Platinum',
      duration: 6,
      price: 200,
    });

    const profile = await showPlan.execute({
      plan_id: plan.id,
    });

    expect(profile.title).toBe('Platinum');
    expect(profile.duration).toBe(6);
    expect(profile.price).toBe(200);
  });

  it('should not be able to show non-existing plan', async () => {
    await expect(
      showPlan.execute({
        plan_id: 'non-existing-plan-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
