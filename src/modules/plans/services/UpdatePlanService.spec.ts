import AppError from '@shared/errors/AppError';

import FakePlansRepository from '../repositories/fakes/FakePlansRepository';
import UpdatePlanService from './UpdatePlanService';

let fakePlansRepository: FakePlansRepository;
let updatePlan: UpdatePlanService;

describe('UpdatePlan', () => {
  beforeEach(() => {
    fakePlansRepository = new FakePlansRepository();

    updatePlan = new UpdatePlanService(fakePlansRepository);
  });

  it('should be able to update the plan', async () => {
    const plan = await fakePlansRepository.create({
      title: 'Platinum',
      duration: 6,
      price: 200,
    });

    const updatedPlan = await updatePlan.execute({
      plan_id: plan.id,
      title: 'Black',
      duration: 12,
      price: 1200,
    });

    expect(updatedPlan.title).toBe('Black');
    expect(updatedPlan.duration).toBe(12);
    expect(updatedPlan.price).toBe(1200);
  });

  it('should not be able to update from non-existing plan', async () => {
    await expect(
      updatePlan.execute({
        plan_id: 'non-existing-plan-id',
        title: 'Platinum',
        duration: 6,
        price: 200,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change title to another plan title ', async () => {
    await fakePlansRepository.create({
      title: 'Platinum',
      duration: 6,
      price: 200,
    });

    const plan = await fakePlansRepository.create({
      title: 'Test',
      duration: 6,
      price: 200,
    });

    await expect(
      updatePlan.execute({
        plan_id: plan.id,
        title: 'Platinum',
        duration: 6,
        price: 200,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
