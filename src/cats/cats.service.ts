import { Injectable, NotFoundException } from '@nestjs/common';
import { Cat } from './entities/cat.entity';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';

@Injectable()
export class CatsService {
  private cats: Cat[] = [
    { id: 1, nombre: 'Michi', edad: 2, raza: 'Persa' }
  ];

  findAll(): Cat[] {
    return this.cats;
  }

  findOne(id: number): Cat {
    const gato = this.cats.find(c => c.id === id);
    if (!gato) throw new NotFoundException(`Gato con id ${id} no encontrado`);
    return gato;
  }

  create(createCatDto: CreateCatDto): Cat {
    const nuevoGato = {
      id: this.cats.length > 0 ? Math.max(...this.cats.map(c => c.id)) + 1 : 1,
      ...createCatDto,
    };
    this.cats.push(nuevoGato);
    return nuevoGato;
  }

  update(id: number, updateCatDto: UpdateCatDto): Cat {
    const indice = this.cats.findIndex(c => c.id === id);
    if (indice === -1) throw new NotFoundException(`Gato con id ${id} no encontrado`);
    
    this.cats[indice] = { ...this.cats[indice], ...updateCatDto };
    return this.cats[indice];
  }

  remove(id: number): void {
    const indice = this.cats.findIndex(c => c.id === id);
    if (indice === -1) throw new NotFoundException(`Gato con id ${id} no encontrado`);
    this.cats.splice(indice, 1);
  }
}
