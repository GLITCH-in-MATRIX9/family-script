// src/modules/tree/tree.service.ts

import slugify from "slugify";

import { TreeRepository } from "./tree.repository";
import { CreateTreeInput, UpdateTreeInput } from "./tree.types";
import {
  TreeAlreadyExistsError,
  TreeNotFoundError,
} from "./tree.errors";

export class TreeService {
  constructor(private readonly treeRepository: TreeRepository) {}

  /**
   * Creates a tree, derives a stable slug from the tree name,
   * and assigns the current user as the owner.
   */
  async createTree(data: CreateTreeInput, ownerId: string) {
    const slug = slugify(data.name, {
      lower: true,
      strict: true,
      trim: true,
    });

    const slugExists = await this.treeRepository.slugExists(slug);

    if (slugExists) {
      throw new TreeAlreadyExistsError(data.name);
    }

    return this.treeRepository.create({
      ...data,
      slug,
      owner: {
        connect: {
          id: ownerId,
        },
      },
    });
  }

  /**
   * Loads a tree by its database ID.
   *
   * userId is currently accepted so this method can be used
   * for service-level access checks.
   */
  async getTreeById(treeId: string, userId: string) {
    const tree = await this.treeRepository.findById(treeId);

    if (!tree) {
      throw new TreeNotFoundError();
    }

    return tree;
  }

  /**
   * Loads a tree by slug for public or route-based lookups.
   */
  async getTreeBySlug(slug: string) {
    const tree = await this.treeRepository.findBySlug(slug);

    if (!tree) {
      throw new TreeNotFoundError();
    }

    return tree;
  }

  /**
   * Returns all trees owned by a user.
   */
  async getUserTrees(ownerId: string) {
    return this.treeRepository.findByOwner(ownerId);
  }

  /**
   * Updates editable tree fields.
   *
   * First verifies that the tree exists and that the
   * current user is passed into the access-check layer.
   */
  async updateTree(
    id: string,
    userId: string,
    data: UpdateTreeInput
  ) {
    await this.getTreeById(id, userId);

    return this.treeRepository.update(id, data);
  }

  /**
   * Marks the tree as archived so it is hidden from
   * normal use without removing the database record.
   */
  async archiveTree(id: string) {
    await this.getTreeById(id, "");

    return this.treeRepository.update(id, {
      isArchived: true,
    });
  }

  /**
   * Reverses an archive operation by restoring the tree.
   */
  async restoreTree(id: string) {
    await this.getTreeById(id, "");

    return this.treeRepository.restore(id);
  }

  /**
   * Soft deletes a tree so the record can potentially
   * be recovered later.
   */
  async deleteTree(treeId: string, userId: string) {
    await this.getTreeById(treeId, userId);

    return this.treeRepository.softDelete(treeId);
  }
}