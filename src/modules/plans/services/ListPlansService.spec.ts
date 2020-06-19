import FakePlansRepository from '../repositories/fakes/FakePlansRepository';
import ListPlansService from './ListPlansService';

let fakePlansRepository: FakePlansRepository;
let listPlans: ListPlansService;

describe('ListPlans', () => {
  beforeEach(() => {
    fakePlansRepository = new FakePlansRepository();

    listPlans = new ListPlansService(fakePlansRepository);
  });

  it('should be able to list the plans', async () => {
    const plan1 = await fakePlansRepository.create({
      title: 'Platinum1',
      duration: 6,
      price: 200,
    });

    const plan2 = await fakePlansRepository.create({
      title: 'Platinum2',
      duration: 6,
      price: 200,
    });

    const plan3 = await fakePlansRepository.create({
      title: 'Platinum3',
      duration: 6,
      price: 200,
    });

    const plans = await listPlans.execute({ page: 1 });

    expect(plans).toEqual([plan1, plan2, plan3]);
  });

  it('should be able to list the plans by specific title', async () => {
    const plan1 = await fakePlansRepository.create({
      title: 'Platinum1',
      duration: 6,
      price: 200,
    });

    await fakePlansRepository.create({
      title: 'Platinum2',
      duration: 6,
      price: 200,
    });

    await fakePlansRepository.create({
      title: 'Platinum3',
      duration: 6,
      price: 200,
    });

    const plans = await listPlans.execute({ page: 1, title: 'Platinum1' });

    expect(plans).toEqual([plan1]);
  });
});
