import { TestingModule, Test } from '@nestjs/testing';
import { MetamorphosisModule } from '../src/metamorphosis.module';
import { ConversionService } from '../src/metamorphosis.service';
import Planet from './models/planet';
import PlanetDtoToPlanet from './converters/planet-dto-to-planet.converter';
import PlanetDto from './dtos/planet.dto';

let conversionService: ConversionService;

describe('Async Conversion Suite', () => {

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MetamorphosisModule.register({logger: true})],
      providers: [PlanetDtoToPlanet]
    }).compile();

    conversionService = module.get<ConversionService>(ConversionService);
  });

  it('test async conversion', async () => {
    const planetDto = new PlanetDto();
    planetDto.id = '1';
    planetDto.name = 'saturn';

    const planet = await conversionService.convert(planetDto, Planet);
    expect(planet.id).toBe('1');
    expect(planet.name).toBe('saturn');
  });

});