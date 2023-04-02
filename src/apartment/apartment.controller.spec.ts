import { AuthGuard } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { ApartmentController } from './apartment.controller';
import { ApartmentService } from './apartment.service';

describe('ApartmentController', () => {
  let controller: ApartmentController;

  const mockApartmentController = {
    createApartment: jest.fn((dto) => {}),
    updateApartment: jest.fn((apartmentId, landlordId, dto) => {}),
    showSingleApartment: jest.fn((apartmentId) => {}),
    showAllApartments: jest.fn(() => {}),
    removeApartment: jest.fn((apartmentId, landlordId) => {}),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApartmentController],
    })
      .overrideGuard(AuthGuard())
      .useValue({ canActivate: () => true })
      .overrideProvider(ApartmentService)
      .useValue(mockApartmentController)
      .compile();

    controller = module.get<ApartmentController>(ApartmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create apartment', () => {
    const dto = {
      address: 'address',
      imagesLink: 'link',
      details: 'details',
      landlordId: 'landlord',
    };

    it('should call createApartment service', () => {
      expect(controller.createApartment(dto)).toBeCalled();
    });
  });

  describe('update apartment', () => {
    const apartmentId = '12345';
    const landlordId = '12345';
    const dto = {
      address: 'address',
      details: 'details',
    };

    it('should call updateApartment service', () => {
      expect(
        controller.updateApartment(apartmentId, landlordId, dto),
      ).toBeCalled();
    });
  });

  describe('show single apartment', () => {
    const apartmentId = '12345';

    it('should call showSingleApartment service', () => {
      expect(controller.showSingleApartment(apartmentId)).toBeCalled();
    });
  });

  describe('show all apartments', () => {
    it('should call showAllApartment service', () => {
      expect(controller.showAllApartments()).toBeCalled();
    });
  });

  describe('remove apartment', () => {
    const apartmentId = '12345';
    const landlordId = '12345';
    it('should call removeApartment service', () => {
      expect(controller.removeApartment(apartmentId, landlordId)).toBeCalled();
    });
  });
});
